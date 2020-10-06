import ast
import boto3
import os
import json
import logging
from src.functions.utility import headers
from botocore.exceptions import ClientError
from src.repositories.repository import registerSlot
import uuid

# Logger configuration
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# function to book slot
def book(body):
    try:
        zipcode = body.get('zipcode', None)
        store_name = body.get('store_name', None)
        slot_date = body.get('slot_date', None)
        logger.info(zipcode)
        logger.info(store_name)
        logger.info(slot_date)
        response = registerSlot(zipcode,store_name,slot_date)
    except (Exception,ClientError) as e:
            raise
    else:
        return response

# Lambda handler function
def bookSlot(event, context, dynamodb=None):
    try:
        body = ast.literal_eval(event['body'])
        response = book(body)
        logger.info(response)
        id = uuid.uuid4().hex
        bodyparams={
            "Message":"Succesfully booked slot",
            "Token":id
        }
        logger.info(bodyparams)
        return {'statusCode': 200,
                'headers': headers,
                'body': json.dumps(bodyparams)
                }
    except (Exception,ClientError) as e:
        logger.info('Closing lambda function')
        logger.info(e)
        return {
            'statusCode': 400,
            'headers':headers,
            'body': json.dumps('Error booking slot')
        }

