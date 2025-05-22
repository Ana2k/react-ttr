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

def main():
    print("🔥 FLAMES Relationship Calculator 🔥")
    name1 = input("Enter your name: ").replace(" ", "").lower()
    name2 = input("Enter their name: ").replace(" ", "").lower()

    uncommon = get_uncommon_letters(name1, name2)
    total_uncommon = len(uncommon)

    print("\n🧩 Uncommon letters between the names:")
    print(" ", ", ".join(uncommon) if uncommon else "None")

    print(f"🔢 Total Uncommon Letter Count: {total_uncommon}")

    result_letter = flames_result(total_uncommon)
    relationship = interpret_result(result_letter)

    print(f"💘 Relationship: {relationship} ({result_letter})")

if __name__ == "__main__":
    main()
