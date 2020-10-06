import logging
from src.repositories.repository import logEvent

# Logger configuration
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def streamEvent(event):
    logger.info("Reading event")
    try:
        for record in event['Records']:
            item = {
                    'pk': record['eventID'],
                    'log_event': record['eventName']
                }
            logger.info(item)
            response = logEvent(item)
    except (ClientError,Exception) as e:
            raise
    else:
        return response

def streamHandler(event, context):
    logger.info("Dynamodb stream API")
    try:
        response = streamEvent(event)
        logger.info(response)
        return 'Successfully logged event'
    except (Exception,ClientError) as e:
        logger.info('Closing lambda function')
        return 'Logging event was unsuccessful'