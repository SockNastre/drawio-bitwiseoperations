#
# tbitops_parse.py - Turns text-written bitwise operations, of my
#                    standard, into simple separate statements and
#                    pieces
#
# Written By: SockNastre
#

def is_variable(c, cBefore, cAfter):
    """
    Checks if character is a variable based on what is after and before it

    c:       character to check
    cBefore: character before character to check
    cAfter:  character after character to check

    returns: if the character is a variable or not
    returnType: boolean
    """

    # variables have space before and after, sometimes paranthesis can be
    # in that place instead of a space
    if (cBefore != ' ' and cBefore != '('):
        return False
    elif (cAfter != ' ' and cAfter != ')'):
        return False
    else:
        return True

def grab_variables(tBitOps):
    """
    Gets variables from string based on standard for algorithm

    tBitOps: textual bitwise-operations to get variables from

    returns: array of grabbed variables as strings
    returnType: string[]
    """

    variableArray = []           # this will be returned in the end
    tBitOpsLength = len(tBitOps) # used to loop through indicies later

    for i in range(tBitOpsLength):
        # cBefore and cAfter will be the characters before and after the
        # character at the current index
        cBefore = ' '
        c = tBitOps[i]
        cAfter = ' '

        # setting up cBefore and cAfter
        if i != 0:
            cBefore = tBitOps[i - 1]
        if i + 1 != tBitOpsLength:
            cAfter = tBitOps[i + 1]

        isCVariable = is_variable(c, cBefore, cAfter)
        if isCVariable:
            variableArray.append(c)
    return variableArray

def is_operation(c, cBefore, cAfter):
    """
    Checks if character is part of an operation based on what is after and
    before it

    c:       character to check
    cBefore: character before character to check
    cAfter:  character after character to check

    returns: if the character is part of an operation or not
    returnType: boolean
    """

    # variables that ensure character is part of operation
    isCVariable = is_variable(c, cBefore, cAfter)
    isCParenthesis = c == '(' or c == ')'
    isCBeforeValid = cBefore == ' ' or cBefore == '('

    # operations have a space/parenthesis before them, the character itself
    # cannot be equal to a left-hand or right-hand parenthesis
    if (not isCVariable and not isCParenthesis and isCBeforeValid):
        return True
    else:
        return False

def grab_operations(tBitOps):
    """
    Gets operations from string based on standard for algorithm

    tBitOps: textual bitwise-operations to get operations from

    returns: array of grabbed operations as strings
    returnType: string[]
    """

    operationArray = []          # this will be returned in the end
    tBitOpsLength = len(tBitOps) # used to loop through indicies later

    for i in range(tBitOpsLength):
        cBefore = ' '
        c = tBitOps[i]
        cAfter = ' '

        # setting up cBefore and cAfter; the characters before and after the
        # character at the current index
        if i != 0:
            cBefore = tBitOps[i - 1]
        if i + 1 != tBitOpsLength:
            cAfter = tBitOps[i + 1]

        # if found true, entire operation gets grabbed
        if (is_operation(c, cBefore, cAfter)):
            operation = ""
            while c != ' ':
                operation += c
                i += 1
                c = tBitOps[i]
            operationArray.append(operation)    
    return operationArray

# grabbing tBitOps and then getting variables and operations
tBitOps = input("\nEnter textual bitwise-operation(s): ")
variableArray = grab_variables(tBitOps)
operationArray = grab_operations(tBitOps)

# printing out individual variables
print("\nVariables:")
for variable in variableArray:
    print(variable)

# printing out individual strings
print("\nOperations:")
for operation in operationArray:
    print(operation)
