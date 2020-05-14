class BasePDBError(Exception):#Base errors class
    pass

class NotValidConfiguration(BasePDBError):#Raise when configuration is not valid
    def __init__(self, field, msg):
        self.field = field
        self.msg = msg