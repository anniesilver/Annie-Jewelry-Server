function test(){
    localStorage.setItem("tet",true);
 
    const retrievedValue = localStorage.getItem("tet");
    console.log(retrievedValue);
    // Correct comparison using strict equality
    console.log(retrievedValue === "true"); // Output: true (if the stored value is "true")
    
    // Incorrect comparison due to case sensitivity
    console.log(retrievedValue == "True"); // Output: false (case doesn't match)
    
    // Incorrect comparison due to type coercion
    console.log(retrievedValue == true); // Output: true (string "tru      
}
test();