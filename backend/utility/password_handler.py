import bcrypt

'''
Generates a salted hash given a plain user password
@returns the hashed password
'''
def generate_hash(plain_text_password):
    encoding = 'utf-8'

    pw_hash = bcrypt.hashpw(plain_text_password.encode(encoding), bcrypt.gensalt())

    return pw_hash.decode(encoding)

'''
Checks a plain text password with the stored hashed password in the database 
@returns a boolean 
'''
def check_password(plain_text_password, hashed_password):
    encoding = 'utf-8'
    
    if (bcrypt.checkpw(plain_text_password.encode(encoding), hashed_password.encode(encoding))):
        result = True
    else:
        result = False # Password is wrong :(
    return result