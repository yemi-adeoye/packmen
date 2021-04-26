console.log("Welcome to packmen");
const MAX_IMAGE_SIZE = 50;
let img_toggle = 0;
const MAX_VELOCITY = 20;
const DEF_DIRECTION = 0;
let container = [];

var displayScreen = document.getElementById('screen');





// holds the packmen images: ltr for left to right images and rtl for right to left images
const packmanImages = {
    'ltr': ['images/ltr-open.png', 'images/ltr-closed.png'],
    'rtl': ['images/rtl-open.png', 'images/rtl-closed.png'],
}

// returns a random number between 1 and limit
// arg: an integer
// return: integer
const helperRandomGenerator = (limit) => {
    return Math.ceil(Math.random() * limit)
}


function getElementBounds(id) {
    let displayScreen = document.getElementById(id);
    console.log(displayScreen)
    height = displayScreen.clientWidth;
    width = displayScreen.clientHeight;
    return { width, height };
}

function zeroOrOneToggler(zeroOrOne) {
    /*
        takes a zero or one value and toggles it
    */
    return (zeroOrOne + 1) % 2;
}

const packmanFactory = () => {
    defaultPackman = document.createElement('img');
    defaultPackman.src = packmanImages.ltr[img_toggle]

    let d = new Date()
    defaultPackman.id = "id-" + d.getTime();

    let bounds = getElementBounds('screen');

    defaultPackman.style.position = 'absolute';
    defaultPackman.style.top = helperRandomGenerator(bounds.height - 200) + 'px';
    defaultPackman.style.left = helperRandomGenerator(bounds.width) + 'px';

    defaultPackman.style.width = helperRandomGenerator(MAX_IMAGE_SIZE) + 'px';
    defaultPackman.style.height = defaultPackman.style.width;

    container.push({
        'x': defaultPackman.style.left,
        'y': defaultPackman.style.top,
        'velocity': helperRandomGenerator(MAX_VELOCITY),
        'direction': DEF_DIRECTION,
        'id': defaultPackman.id,
        'img': defaultPackman.src,
        'width': defaultPackman.style.width
    })
    displayScreen.appendChild(defaultPackman);
}

function toggleDirection(posX, direction, elemWidth) {
    /* determines if an object has crossed the 
       left or right border of the screen
       if it has, it reverses the direction.
       params: domElem is the element that moves accorss the screen
       posX is the position of domElement in the x axis
       direction is 0 for right to left, and 1 for the reverse */
    let bounds = getElementBounds('screen');

    console.log(elemWidth)

    if ((posX + elemWidth) > bounds.width + 150 || (posX - elemWidth) < 0) {
        direction = (direction + 1) % 2;
        console.log('i get called')
    }

    if (posX == 0) {
        direction = direction;
    }

    return direction;
}

function setImage(packmanImage, packmanImages, direction, toggle) {
    /* determines which image to display aon each setInterval call 
    *  params: packmanImage : domElement img element that holds packman images
        packmanImages: dictionary containing all four packman images
        direction: 0 to go right to left, 1 for left to right
        toggle: 0 or 1 to display open or closed packlman oimage
    */

    if (direction) {
        packmanImage.src = packmanImages['rtl'][toggle];
    } else {
        packmanImage.src = packmanImages['ltr'][toggle];
    }
}

const move = () => {

    container.forEach(element => {

        let packmanImg = document.getElementById(element.id);
        console.log(element);
        // determine the direction
        let direction = toggleDirection(element.x, element.direction, parseInt(element.width));

        element.direction = direction;

        img_toggle = zeroOrOneToggler(img_toggle);


        setImage(packmanImg, packmanImages, direction, img_toggle);

        if (element.direction) {

            element.x = parseInt(element.x) - element.velocity;

        } else {

            element.x = parseInt(element.x) + element.velocity;

        }

        packmanImg.style.left = element.x + 'px';
    })
}

function doMove() {
    setInterval(() => {

        move();

    }, 500);
}
/**/


console.log(helperRandomGenerator(10));