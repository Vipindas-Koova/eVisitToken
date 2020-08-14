import boto3
import os
import json
import logging
import uuid
from src.repositories.repository import fetchUser
from src.repositories.repository import fetchUsers
from src.repositories.repository import fetchStores
from src.repositories.repository import removeUser 
from src.repositories.repository import registerSlot
from src.repositories.repository import checkSlot
import uuid

# Logger configuration
logger = logging.getLogger()
logger.setLevel(logging.INFO)


# This is lambda handler function
def handler(event, context):
    logger.info(event)
    
    if event['field'] == 'getUser':
        user_id = event['arguments']['user_id']
        user_type = event['arguments']['user_type']
        logger.info(user_id)
        logger.ino(user_type)
        return getUser(user_id,user_type)
    
    elif event['field'] == 'allUsers':
        logger.info("fetching all users")
        return getUsers()
    
    elif event['field'] == 'getStores':
        zipcode = event['arguments']['zipcode']
        logger.info(zipcode)
        return getStores(zipcode)
    
    elif event['field'] == 'deleteUser':
        user_id = event['arguments']['user_id']
        user_type = event['arguments']['user_type']
        logger.info(user_id)
        logger.ino(user_type)
        return deleteUser(user_id,user_type)
    
    elif event['field'] == 'bookSlot':
        zipcode = body['zipcode']
        store_name = body['store_name']
        slot_date = body['slot_date']
        logger.info(zipcode)
        logger.info(store_name)
        logger.info(slot_date)
        return bookSlot(zipcode,store_name,slot_date)
    
    elif event['field'] == 'getSlots':
        zipcode = body['zipcode']
        store_name = body['store_name']
        logger.info(zipcode)
        logger.info(store_name)
    return getSlots(zipcode,store_name)
    
    return 'Unknown field, unable to resolve '+event['field']

# This is to get single User Object 
def getUser(user_id,user_type):
    # fetch User from the database
    response = fetchUser(user_id,user_type)
    logging.error(response)
    return response['Item']

# This function is use to get all users
def getUsers():
    # fetch all users from the database
    response = fetchUsers()
    
    while 'LastEvaluatedKey' in response:
        response = etoken_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])
    logger.info(response['Items'])
    return response['Items']

# This function is use to get all Stores
def getStores(zipcode):
    # fetch all Stores from the database
    response = fetchStores(zipcode)
    logger.info(response['Items'])
    return response['Items']

# This function is use to delete User
def deleteUser(user_id,user_type):
    # delete the user from the database
    removeUser(user_id,user_type)
    return "Deleted"

# This function is use to book slot
def bookSlot(zipcode,store_name,slot_date):
    response = registerSlot(zipcode,store_name,slot_date)
    logger.info(response)
    id = uuid.uuid4().hex
    bodyparams={
        "Message":response,
        "Token":id
    }
    return bodyparams

# This function is use to get slots of store
def getSlots(zipcode,store_name):
    response = checkSlot(zipcode,store_name)
    logger.info(response)
    return response
    