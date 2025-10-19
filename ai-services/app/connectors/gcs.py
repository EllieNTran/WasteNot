from google.cloud import storage

from app.settings import settings

client = storage.Client()


def upload_object_to_bucket(source_file, destination_blob_name):
    """
    source_file (str): Path to the local file to be uploaded.
    destination_blob_name (str): Name of the object in the GCS bucket.
    """

    try:
        blob = client.bucket(settings.bucket_name).blob(destination_blob_name)
        blob.upload_from_filename(source_file)

        print(f'File {source_file} uploaded to {settings.bucket_name}/{destination_blob_name}')
    
    except Exception as e:
        print(f'Error uploading file: {str(e)}')


def retrieve_object_from_bucket(object_name, destination_file_path):
    """
        object_name (str): The name of the object you want to retrieve.
        destination_file_path (str): The path to save the retrieved object locally.
    """
    
    try:
        blob = client.bucket(settings.bucket_name).blob(object_name)
        blob.download_to_filename(destination_file_path)

        print(f"Object '{object_name}' retrieved and saved to '{destination_file_path}'.")

    except Exception as e:
        print(f"Error: {e}")
