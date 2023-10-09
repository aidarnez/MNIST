# MNIST
## Project idea
Built neural network for hand-written digit classification.
Create web drawing app, imploment digit recognition with nn model.
## Basic nn
I built multilayer perceptron with 4 linear layers, trained the model on MNIST dataset.
Model results:
![image](https://github.com/aidarnez/MNIST/assets/90914886/300c6343-9911-458b-9681-3af089f53968)

## cnn
I built convolutional nn with 3 conv. layers and 2 linear layers.
Model results:
![image](https://github.com/aidarnez/MNIST/assets/90914886/81f89799-9aa4-4b72-b9fb-eeaa1561c26c)
## Web app

I created web app with flask and JS.

![image](https://github.com/aidarnez/MNIST/assets/90914886/ae207034-3b21-44d2-ad61-790a70cfc966)

## Testing
Web app saves drawings to img folder. 
Accuracy results on saved drawings:
**basic nn - 0.899
cnn - 0.967**
## Requirements
You can install requirements using the following command
```[shell]
conda create --name <env> --file requirments.txt
```
