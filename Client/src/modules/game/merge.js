import mergeImg from 'merge-img';

module.exports.join = (images) => mergeImg(images).then((img) => img.write('last.png'));
