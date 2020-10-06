import ast
import boto3
import os
import json
import logging
from src.functions.utility import headers
from botocore.exceptions import ClientError
from src.repositories.repository import newItem

# Logger configuration
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# function to construct storeCreation request and post item to dynambodb
def storeCreation(body):
    try:
        zipcode = body['zipcode'].get('zipcode', None)
        store_name = body.get('store_name', None)
        store_details = body.get('store_details', None)
        slots = body.get('slots', None)
        item = {
            'pk': zipcode,
            'sk': store_name,
            'store_details': store_details,
            'slots': slots
        }
        logger.info(item)
        response = newItem(item)
    except (Exception,ClientError) as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            logger.info(e.response['Error']['Message'])
        else:
            raise
    else:
        return response

# Lambda handler function
def createStore(event, context, dynamodb=None):
    try:
        body = ast.literal_eval(event['body'])
        response = storeCreation(body)
        logger.info(response)
        return {'statusCode': 200,
                'headers': headers,
                'body': json.dumps('Succesfully created Store')}
    except (Exception,ClientError) as e:
        logger.info('Closing lambda function')
        logger.info(e)
        return {
            'statusCode': 400,
            'headers': headers,
            'body': json.dumps('Error creating Store')
        }
