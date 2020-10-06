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
def userCreation(body):
    try:
        user_id = body.get('user_id', None)
        item_type = body.get('item_type', None)
        user_type = body.get('user_type', None)
        dashboard = body.get('dashboard', None)
        user_details = body.get('user_details', None)
        item = {
            'pk': user_id,
            'sk': user_type,
            'dashboard': dashboard,
            'type': item_type,
            'user_details': user_details
        }
        if user_type == "shopper":
            history = body.get('history', None)
            item.update({'history': history})
        elif user_type == "store_owner":
            store_details = body.get('store_details', None)
            messages = body.get('messages', None)
            item.update({'store_details': store_details, 'messages': messages})
        response = newItem(item)
    except (Exception,ClientError) as e:
        if e.response['Error']['Code'] == "ConditionalCheckFailedException":
            logger.info(e.response['Error']['Message'])
        else:
            raise
    else:
        return response

#Lambda handler function 
def createUser(event, context, dynamodb=None):

    try:
        body = ast.literal_eval(event['body'])
        response = userCreation(body)
        logger.info(response)
        return {'statusCode': 200,
                'headers':headers,
                'body': json.dumps('Succesfully created user')}
    except (Exception,ClientError) as e:
        logger.info('Closing lambda function')
        logger.info(e.response['Error']['Message'])
        return {
            'statusCode': 400,
            'headers':headers,
            'body': json.dumps('Error creating user')
        }
