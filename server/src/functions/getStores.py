import ast
import boto3
import os
import json
import logging
from src.functions.utility import headers
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
from decimal import Decimal
from src.repositories.repository import fetchStores

# Logger configuration
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" %
                    type(obj).__name__)

# function to fetch list of stores based on zipcode
def storesList(body):
    try:
        zipcode = body.get('zipcode',None)
        response = fetchStores(zipcode)
    except (Exception,ClientError) as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            logger.info(e.response['Error']['Message'])
        else:
            raise
    else:
        return response

# Lambda handler function
def getStores(event, context, dynamodb=None):
    try:
        body = ast.literal_eval(event['body'])
        response = storesList(body)
        logger.info(response)
        return {'statusCode': 200,
                'headers':headers,
                'body': json.dumps(response['Items'], default=default)}
    except (Exception,ClientError) as e:
        logger.info('Closing lambda function')
        logger.info(e.response['Error']['Message'])
        return {
            'statusCode': 400,
            'headers':headers,
            'body': 'Error:{}'.format(e)
        }
