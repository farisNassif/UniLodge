import bcrypt as bc

'''
Generates a salted hash given a plain user password

@returns the hashed password
'''
def generate_hash(plain_text_password):
    pw_hash = bc._bcrypt.hashpw(plain_text_password.encode("utf-8"), bc.gensalt())
    return pw_hash

'''
Checks a plain text password with the stored hashed password in the database 

@returns a boolean 
'''
def check_password(plain_text_password, hashed_password):
    if bc._bcrypt.checkpw(plain_text_password, hashed_password):
        result = True
    else:
        result = False # Password is wrong :(
    return result