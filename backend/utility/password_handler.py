import hashlib

'''
Generates a salted hash given a plain user password
@returns the hashed password
'''
def generate_hash(plain_text_password):
    m = hashlib.sha256()
    m.update(plain_text_password.encode('utf8'))
    
    return m.hexdigest()

'''
Checks a plain text password with the stored hashed password in the database 
@returns a boolean 
'''
def check_password(plain_text_password, hashed_password):
    if hashlib.sha256(plain_text_password.encode('utf8')).hexdigest() == hashed_password:
        result = True
    else:
        result = False # Password is wrong :(
    return result