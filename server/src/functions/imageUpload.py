import ast
import boto3
import os
import json
import logging
from botocore.exceptions import ClientError
from decimal import Decimal
from src.repositories.repository import imgUpload

# Logger configuration
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# # function to fetch single user details
# def uploadImage(body):
#     try:
#         get_file=body
#         response = imgUpload(user_id,user_type)
#     except (ClientError, KeyError) as e:
#         if e.response['Error']['Code'] == "ConditionalCheckFailedException":
#             logger.info(e.response['Error']['Message'])
#         else:
#             raise
#     else:
#         return response
    
# Lambda handler function
def imageUpload(event, context, dynamodb=None):
    try:
        body = ast.literal_eval(event['body'])
        # response = uploadImage(body)
        logger.info(body)
        return {'statusCode': 200,
                'headers':
                    {"Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": True,
                    "Access-Control-Allow-Headers": "Authorization"},
                'body': json.dumps("image uploaded")
                }
    except Exception as e:
        logger.info('Closing lambda function')
        logger.info(e)
        return {
            'statusCode': 400,
            'headers':
                {"Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True,
                "Access-Control-Allow-Headers": "Authorization"},
            'body': 'Error:{}'.format(e)
        }