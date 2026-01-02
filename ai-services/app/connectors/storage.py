from supabase import create_client, Client
from app.settings import settings

client: Client = create_client(settings.supabase_url, settings.supabase_anon_key)


def upload_object_to_bucket(source_file, destination_blob_name):
    """
    source_file (str): Path to the local file to be uploaded.
    destination_blob_name (str): Name of the object in the Supabase bucket.
    """

    try:
        with open(source_file, 'rb') as f:
            file_data = f.read()
        
        response = client.storage.from_(settings.bucket_name).upload(
            path=destination_blob_name,
            file=file_data,
            file_options={"content-type": "image/jpeg"}
        )

        print(f'File {source_file} uploaded to {settings.bucket_name}/{destination_blob_name}')
    
    except Exception as e:
        print(f'Error uploading file: {str(e)}')


def retrieve_object_from_bucket(object_name, destination_file_path):
    """
        object_name (str): The name of the object you want to retrieve.
        destination_file_path (str): The path to save the retrieved object locally.
    """
    
    try:
        response = client.storage.from_(settings.bucket_name).download(object_name)
        
        with open(destination_file_path, 'wb') as f:
            f.write(response)

        print(f"Object '{object_name}' retrieved and saved to '{destination_file_path}'.")

    except Exception as e:
        print(f"Error: {e}")
