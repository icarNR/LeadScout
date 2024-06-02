from pymongo import MongoClient, errors
import sys
from models.company_model import LoginUser
from models.user_model import User,Results
from passlib.context import CryptContext
from bson import ObjectId


class DatabaseConnection:
    def __init__(self,collection_name):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        try:
            # Replace the placeholder data with your actual Atlas connection string
            atlas_connection_string = "mongodb+srv://nisalRavindu:tonyStark#117@cluster0.wsf6jk3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

            # Create a connection to MongoDB Atlas
            self.client = MongoClient(atlas_connection_string)
        except errors.ConfigurationError:
            print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
            sys.exit(1)

        # Access a database from your Atlas cluster (replace 'mydatabase' with your database name)
        self.db = self.client.Cluster0
        self.collection = self.db[collection_name]
        #self.collection.drop()
        
    def add_document(self, document):
        try:
            result = self.collection.insert_one(document)
            print("Document inserted with id: ", result.inserted_id)
        except Exception as e:
            print("An error occurred while inserting the document: ", e)
    
    def update_document(self, document_id, attribute, new_value):
        try:
            # Update the attribute in the document
            result = self.collection.update_one(
                {"_id": ObjectId(document_id)},
                {"$set": {attribute: new_value}}
            )
            
            if result.modified_count != 1:
                print("Document updated successfully.")
            else:
                print("No documents matched the filter. Document was not updated.")
        except Exception as e:
            print("An error occurred while updating the document: ", e)

    def get_document_by_id(self, document_id):
        try:
            document = self.collection.find_one({"_id": ObjectId(document_id)})
            if document is not None:
                print("Document found: ", document)
                return document
            else:
                print("No documents matched the filter.")
        except Exception as e:
            print("An error occurred while finding the document: ", e)

    def find_document_by_attribute(self, attribute, value):
        try:
            document = self.collection.find_one({attribute: value})
            if document is not None:
                print("Document found: ", str(document["_id"]))
                return str(document["_id"])  # return the _id of the document
            else:
                print("No documents matched the filter.")
                return None  # return None if no document is found
        except Exception as e:
            print("An error occurred while finding the document: ", e)
    
    def delete_document(self, document_id):
        try:
            result = self.collection.delete_one({"_id": document_id})
            if result.deleted_count == 1:
                print("Document deleted successfully.")
            else:
                print("No documents matched the filter. Document was not deleted.")
        except Exception as e:
            print("An error occurred while deleting the document: ", e)


    def get_all_documents(self):
        try:
            documents = []
            for document in self.collection.find({}):
                documents.append(document)
            return documents
        except Exception as e:
            print("An error occurred while getting all documents: ", e)
    
    def get_attribute_value(self, document_id, attribute):
        try:
            # Find the document by its _id
            document = self.collection.find_one({"_id": ObjectId(document_id)})
            
            # Check if the document exists
            if document is not None:
                # Check if the attribute exists in the document
                if attribute in document:
                    print(f"The value of {attribute} is: ", document[attribute])
                    return document[attribute]
                else:
                    print(f"The attribute {attribute} does not exist in the document.")
            else:
                print("No documents matched the filter.")
        except Exception as e:
            print("An error occurred while getting the attribute value: ", e)
            
 




 ##User-related operations
    async def get_user(self, email: str) -> LoginUser:
        """Get a user by their email."""
        return  self.collection.find_one({"email": email})

    async def create_user(self, employee_id: str, email: str, password: str) -> LoginUser:
        """Create a new user with hashed password."""
        hashed_password = self.pwd_context.hash(password)
        user = {"employee_id": employee_id, "email": email, "hashed_password": hashed_password}
        result =  self.collection.insert_one(user)
        return LoginUser(**user, id=str(result.inserted_id))

    async def authenticate_user(self, email: str, password: str) -> bool:
        """Authenticate a user by email and password."""
        user = await self.get_user(email)
        if not user:
            return False
        if not self.pwd_context.verify(password, user["hashed_password"]):
            return False
        return LoginUser(**user)
