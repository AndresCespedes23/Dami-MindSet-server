function  validateDescription(){
  const errorDescription = document.getElementById("error-description");
  errorDescription.innerText = "";
  if (!activity.value)
    return errorActivity.innerText = "Description is missing.";
  if (activity.value.length > 5000 || activity.value.length < 5)
    return errorActivity.innerText = "Description must be greater than 5 and less than 5000 characters.";
};