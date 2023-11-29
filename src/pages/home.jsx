
import React from 'react';
import { Navbar, Page, BlockTitle, Block, Input, Button } from 'framework7-react';
import { convertToBase64, getCurrentDateTime, getImageFromAI, validImage, validQuery, shareFacebook, shareInstgarm } from '../js/util';
import store from '../js/store';

const errorIcon = './icons/error.png'; // error icon
const loadingIcon = './icons/loading.webp'; // loading animation
const randomPic = 'https://picsum.photos/200'; // get random picture


const HomePage = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [imageSrc, setImageSrc] = React.useState(randomPic);
  const [processing, setProcessing] = React.useState(false);

  const clear = () => {
    setInputValue('');
    setProcessing(false);
  };

  /**
   * Get image from AI, covert to Base64 and assign to Image element
   */
  const generatePicture = () => {
    // exit if query is not valid
    if (!validQuery(inputValue)) return;

    setProcessing(true);
    // set loading image
    setImageSrc(loadingIcon);

    getImageFromAI({ 'inputs': inputValue })
      .then(async (resultBlob) => {
        const base64Data = await convertToBase64(resultBlob);
        if (validImage(base64Data)) {
          // set AI image
          setImageSrc(base64Data);
          store.dispatch('addImage', {
            title: inputValue,
            src: base64Data,
            date: getCurrentDateTime(),
          });
          clear();
        } else {
          alert('Could not generate image. Please try again.');
          setImageSrc(errorIcon);
          setProcessing(false);
        }
      })
      .catch(e => {
        console.log(e);
        clear();
      });
  };

  const handleTextChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Page className='grid-demo'>
      <Navbar title='Image To SNS'></Navbar>
      <BlockTitle>Input query and Go!</BlockTitle>
      <Block>
        <div className='grid grid-cols-2 grid-gap'>
          <Input type='text' placeholder='Ninja Cat' 
            value={inputValue} onChange={handleTextChange} />
          <Button outline 
            onClick={generatePicture}
            disabled={processing}
          >
            Go
          </Button>
        </div>
      </Block>
      <Block>
        <div className='grid grid-cols-1'>
          <img src={imageSrc}
            width={350} 
            height={350}
            style={{ border: '2px solid #000' }}
          />
        </div>
      </Block>
      <Block>
        <div className='grid grid-cols-2 grid-gap'>
          <Button
            iconIos='f7:logo_facebook'
            iconMd='material:facebook'
            onClick={() => shareFacebook(imageSrc)}
          />
          <Button
            iconIos='f7:logo_instagram'
            iconMd='material:instagram'
            onClick={() => shareInstgarm(imageSrc)}
          />
        </div>
      </Block>
      
    </Page>
  );

}

export default HomePage;