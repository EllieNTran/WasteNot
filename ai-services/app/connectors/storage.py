import logging
from supabase import create_client, Client
from app.settings import settings

logger = logging.getLogger(__name__)

client: Client = create_client(
    settings.supabase_url, settings.supabase_service_role_key
)


def upload_object_to_bucket(source_file, destination_blob_name):
    """Uploads a file to the Supabase storage bucket.
    
    Args:
        source_file (str): Path to the local file to be uploaded.
        destination_blob_name (str): Name of the object in the Supabase bucket.
    """

    try:
        with open(source_file, "rb") as f:
            file_data = f.read()

        client.storage.from_(settings.bucket_name).upload(
            path=destination_blob_name,
            file=file_data,
            file_options={"content-type": "image/jpeg"},
        )

        logger.info(
            f"File {source_file} uploaded to {settings.bucket_name}/{destination_blob_name}"
        )

    except Exception as e:
        logger.warning(f"Error uploading file: {str(e)}")


def retrieve_object_from_bucket(object_name, destination_file_path):
    """Retrieves an object from the Supabase storage bucket and saves it locally.

    Args:
        object_name (str): The name of the object you want to retrieve.
        destination_file_path (str): The path to save the retrieved object locally.
    """

    try:
        response = client.storage.from_(settings.bucket_name).download(object_name)

        logger.info(f"Downloaded {len(response)} bytes")

        with open(destination_file_path, "wb") as f:
            f.write(response)

        logger.info(
            f"Object '{object_name}' retrieved and saved to '{destination_file_path}'."
        )

    except Exception as e:
        logger.warning(f"Error downloading from storage: {e}")
        raise
