import ast
import boto3
import os
import json
import logging
from src.functions.utility import headers
from botocore.exceptions import ClientError
from src.repositories.repository import newItem 
#Logger configuration
logger = logging.getLogger()
logger.setLevel(logging.INFO)

#function to construct userCreation request and post item to dynambodb
def userBooking(body):
    try:
        user_id = body.get('user_id', None)
        dateTime= body.get('dateTime', None)
        token_id = body.get('token_id', None)
        item = {
            'pk': user_id,
            'sk': dateTime,
            'token_id':token_id
        }
        response = newItem(item)
    except (Exception,ClientError) as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            logger.info(e.response['Error']['Message'])
        else:
            raise
    else:
        return response

#Lambda handler function 
def createUserBooking(event, context, dynamodb=None):

    try:
        body = ast.literal_eval(event['body'])
        response = userBooking(body)
        logger.info(response)
        return {'statusCode': 200,
                'headers':headers,
                'body': json.dumps('Succesfully created record')}
    except Exception as e:
        logger.info('Closing lambda function')
        logger.info(e.response['Error']['Message'])
        return {
            'statusCode': 400,
            'headers':headers,
            'body': json.dumps('Error creating record')
        }
