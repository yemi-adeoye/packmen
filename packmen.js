// Global Variables
const MAX_IMAGE_SIZE = 50;
let imgToggle = 0;
const MAX_VELOCITY = 20;
const DEF_DIRECTION = 0;
let container = [];

var displayScreen = document.getElementById('screen');

// holds the packmen images: ltr for left to right images and rtl for right to left images
const packmanImages = {
    ltr: ['images/packman1.png', 'images/packman2.png'],
    rtl: ['images/packman3.png', 'images/packman4.png'],
};

/**
 * @param  {integer} limit
 * returns an integer between 1 and limit
 */
const helperRandomGenerator = (limit) => {
    return Math.ceil(Math.random() * limit);
};

/**
 * @param  {string} id: id of html whose bounds is sought
 * @return {object} : return an object with the width and height of the element
 */
const getElementBounds = (id) => {
    let displayScreen = document.getElementById(id);
    height = displayScreen.offsetHeight;
    width = displayScreen.offsetWidth;
    return {
        width,
        height
    };
}

/**
 * @param  {int} zeroOrOne : any integer
 * @return {int}: returns 0 or 1
 */
const zeroOrOneToggler = (zeroOrOne) => {

        return (zeroOrOne + 1) % 2;
    }
    /**
     * @param void - takes no parameters
     * @return undefined 
     * function creates packmen and appends them to the web element
     */
const packmanFactory = () => {
    defaultPackman = document.createElement('img');
    defaultPackman.src = packmanImages.ltr[imgToggle];

    let d = new Date();
    defaultPackman.id = 'id-' + d.getTime();

    defaultPackman.style.width = helperRandomGenerator(MAX_IMAGE_SIZE) + 'px';
    defaultPackman.style.height = defaultPackman.style.width;

    let bounds = getElementBounds('screen');

    defaultPackman.style.position = 'absolute';

    defaultPackman.style.top = helperRandomGenerator(bounds.height - parseInt(defaultPackman.style.height)) + 'px';
    defaultPackman.style.left = helperRandomGenerator(bounds.width - parseInt(defaultPackman.style.height)) + 'px';

    container.push({
        x: parseInt(defaultPackman.style.left),
        y: parseInt(defaultPackman.style.top),
        velocityX: helperRandomGenerator(MAX_VELOCITY),
        velocityY: helperRandomGenerator(MAX_VELOCITY),
        direction: DEF_DIRECTION,
        id: defaultPackman.id,
        img: defaultPackman.src,
        width: defaultPackman.style.width,
        height: defaultPackman.style.height,
    });

    displayScreen.appendChild(defaultPackman);

};

/**
 * @param  {int} posX: the x position of the packman
 * @param  {int} posY: the y position of the packman
 * @param  {int} direction: 0 for left to right, 1 for right to left
 * @param  {int} elemWidth: packman width
 * @param  {int} elemHeight: packman height
 * @return {undefined} 
 */
function toggleDirection(element) {

    let bounds = getElementBounds('screen');

    if (element.x + parseInt(element.width) >= bounds.width || element.x < 0) {
        element.direction = (element.direction + 1) % 2;
        element.velocityX = -element.velocityX;
    }

    if (element.y + parseInt(element.height) >= bounds.height || element.y < 0) {
        element.velocityY = -element.velocityY;
    }

}

/**
 * @param  {DOM element} packmanImage : img element for a packman
 * @param  {array} packmanImages : holds src for all four packmen images
 * @param  {int } direction : zero or 1, the direction of a packman
 * @param  {int } toggle : 0 or 1 to display open or closed packlman oimage
 */
function setImage(packmanImage, packmanImages, direction, toggle) {

    if (direction) {
        packmanImage.src = packmanImages['rtl'][toggle];
    } else {
        packmanImage.src = packmanImages['ltr'][toggle];
    }
}

/**
 * @param {void}
 * @return {undefined}
 * performs animation
 */
const move = () => {

    container.forEach((element) => {
        let packmanImg = document.getElementById(element.id);

        // determine the direction
        toggleDirection(element);

        setImage(packmanImg, packmanImages, element.direction, imgToggle);

        imgToggle = zeroOrOneToggler(imgToggle);

        element.x = parseInt(element.x) + element.velocityX;
        element.y = parseInt(element.y) + element.velocityY;

        packmanImg.style.left = element.x + 'px';
        packmanImg.style.top = element.y + 'px';
    });

    setTimeout(move, 100);

}