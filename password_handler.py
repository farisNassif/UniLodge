# ('bcrypt': Used for hashing and handling of password)
import bcrypt as bc

def generate_hash(plain_text_password):
    pw_hash = bc._bcrypt.hashpw(plain_text_password.encode("utf-8"), bc.gensalt())
    return pw_hash

def check_password(plain_text_password, hashed_password):
    if bc._bcrypt.checkpw(plain_text_password, hashed_password):
        result = True
    else:
        result = False
    return result