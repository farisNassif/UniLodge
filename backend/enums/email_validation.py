from enum import Enum, unique, IntEnum

'''
Enum used for checking if an email belongs to a valid college within Galway
'''
@unique # Ensures unique member values
class valid_email(Enum):
    gmit = "gmit"
    nuig = "nuig"
    gti = "gti"
    gcc = "gcc"


''' 
Converts the enum into a list then to a string to allow for removing unnecessary 
information within the list then back to a list to allow for iteration
'''
def manipulate_enum():
    # Manipulating the enum into different data structures to allow for iterations
    enum_list = list(map(str, valid_email))
    enum_list = str(enum_list)

    # Converting to string to remove unnecessary enum strings within the list
    enum_list_tostring = enum_list
    enum_list_tostring = enum_list_tostring.replace("valid_email.", "")
    enum_list_tostring = enum_list_tostring.replace("[", "")
    enum_list_tostring = enum_list_tostring.replace("]", "")
    enum_list_tostring = enum_list_tostring.replace(",", "")
    enum_list_tostring = enum_list_tostring.replace("\"", "")
    enum_list_tostring = enum_list_tostring.replace("\'", "")

    # Converting it back to a list
    enum_list_tostring = enum_list_tostring.split()
    enum_list_back_to_list = list(enum_list_tostring)

    # Return the list
    return enum_list_back_to_list

''' 
Called when a user registers, to check if an email belongs to a valid College within Galway
'''
def check_email(email):
    for s in manipulate_enum():
        if (s in email):
            return True # Email was matched and is valid - Good!
        else:
            return False # Email doesn't come from a valid College - Bad! 
