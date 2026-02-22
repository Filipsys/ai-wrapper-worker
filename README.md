### Usage:
```
curl "https://ai.filyys.dev/ask?k=KEY&q=Hi%20how%20are%20you"
```
or you can use a more complex command to encode your string easily
```
curl --get --data-urlencode "k=KEY" --data-urlencode "q=Hi how are you" "https://ai.filyys.dev/ask"
```
vim command for pasting the output straight into the editor
```
:r !curl --get --data-urlencode "k=KEY" --data-urlencode "q=Hi how are you" "https://ai.filyys.dev/ask"
```
