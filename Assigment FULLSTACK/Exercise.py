        # 1.prediction (tricky types)
x = 5 
y = "5" 
print(x + int(y) * 2)

       # 2.Variable Mutation
x = 10 
y = x 
x = x + 5 
y = y * 2 
print(x, y)

       #3. Unpacking
data = ["Python", 3, 8.5] 
a, b, c = data 
print(a * b)

        #4. Fix Error
x = 10 
y = "20" 


#Fix 1:
print(x + int(y))  # 30

#Fix 2:
print(str(x) + y)  # "1020"

        #5. Global Variable Trap
x = "Hello"

def change():
    x = "World"

change()
print(x)

        #6. Complex Print
print("Age:", 20 + 5, "Years" + " Old")

         #7. Multi Assignment
x = y = z = 10 
x += 5 
y *= 2 
z -= 3 
print(x, y, z)

         #8. Case-Sensitive
age = 25 
Age = 30 
print(age + Age)
          
          #9. Unpacking Error Challenge
fruits = ["apple", "banana"]
x, y = fruits

print(x,y)

          #10. Mixed Operations
x = "3" 
y = 2 
z = float(x) * y + int(x) 
print(z)

           #11. Print Without New Line
print("Hello", end="-") 
print("World", end="-") 
print("Python")

            #12. Hidden Casting
x = "10" 
y = "5" 
print(int(x) + int(y) * int(x))

              #13. Reassign & Track
x = 5 
x = x + 2 
x = x * x 
x = x - 3 
print(x)

              #14. Naming Trick
my_var = 10 
myVar = 20 
print(my_var + myVar)

               #15. Advanced Challenge 
x, y = 5, 10 
x, y = y, x + y 
print(x, y)