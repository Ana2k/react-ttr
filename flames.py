from collections import Counter

# def get_uncommon_letters(name1, name2):
#     count1 = Counter(name1)
#     count2 = Counter(name2)

#     s = ""
#     for k in count1.keys():
#         if(count2.get(k,0)==0):
#             s+=k
#     for k in count2.keys():
#         if(count1.get(k,0)==0):
#             s+=k
        
#     print(s)
#     return s

def get_uncommon_letters(name1, name2):
    # Convert names to lowercase and remove spaces
    set1 = set(name1.replace(" ", "").lower())
    set2 = set(name2.replace(" ", "").lower())

    # Symmetric difference: elements present in only one of the sets
    uncommon = sorted(set1.symmetric_difference(set2))  # sort for consistency

    result = ''.join(uncommon)
    print(result)
    return result


def flames_result(total_uncommon):
    flames = ['F', 'L', 'A', 'M', 'E']
    index = 0
    while len(flames) > 1:
        index = (index + total_uncommon - 1) % len(flames)
        flames.pop(index)
    return flames[0]

def interpret_result(letter):
    meanings = {
        'F': 'Friends',
        'L': 'Lovers',
        'A': 'Affectionate',
        'M': 'Marriage',
        'E': 'Enemies',
    }
    return meanings.get(letter, "Unknown")

def calculate_flames(name1, name2):
    # Remove spaces and convert to lowercase
    name1 = name1.replace(" ", "").lower()
    name2 = name2.replace(" ", "").lower()
    
    # Create frequency maps for both names
    freq1 = {}
    freq2 = {}
    
    # Count characters in first name
    for char in name1:
        freq1[char] = freq1.get(char, 0) + 1
    
    # Count characters in second name
    for char in name2:
        freq2[char] = freq2.get(char, 0) + 1
    
    # Calculate remaining characters
    remaining = 0
    for char in freq1:
        if char in freq2:
            remaining += abs(freq1[char] - freq2[char])
        else:
            remaining += freq1[char]
    
    for char in freq2:
        if char not in freq1:
            remaining += freq2[char]
    
    # Calculate FLAMES result
    flames = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemy', 'Sister']
    index = 0
    flames_length = len(flames)
    
    while flames_length > 1:
        index = (index + remaining - 1) % flames_length
        flames.pop(index)
        flames_length -= 1
    
    return flames[0]

def main():
    print("Welcome to FLAMES Calculator!")
    name1 = input("Enter first name: ")
    name2 = input("Enter second name: ")
    
    if not name1.strip() or not name2.strip():
        print("Please enter both names!")
        return
    
    result = calculate_flames(name1, name2)
    print(f"\nThe relationship between {name1} and {name2} is: {result}")

if __name__ == "__main__":
    main()
