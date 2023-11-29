
import React from 'react';
import { Navbar, Page, BlockTitle, Block, Input, Button } from 'framework7-react';
import { addToLocalStorage, convertToBase64, validImage } from '../js/util';

const query = async (data) => {
  const key = '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';
  const apiEndPoint = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0'
  const response = await fetch(
    apiEndPoint,
    {
      headers: { Authorization: `Bearer ${key}` },
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
};

const HomePage = () => {
  const loadingIcon = './icons/loading.webp';
  const randomPic = 'https://picsum.photos/200';
  const [inputValue, setInputValue] = React.useState('');
  const [imageSrc, setImageSrc] = React.useState(randomPic);
  const [processing, setProcessing] = React.useState(false);

  const clear = () => {
    setInputValue('');
    setProcessing(false);
  };

  const generatePicture = () => {
    setProcessing(true);
    setImageSrc(loadingIcon);
    query({ 'inputs': inputValue })
    .then(async (resultBlob) => {
      const base64Data = await convertToBase64(resultBlob);
      if (validImage(base64Data)) {
        setImageSrc(base64Data);
        addToLocalStorage(inputValue, base64Data);
      } else {
        alert('Could not generate image. Please try again.');
        setImageSrc(randomPic);
      }
      clear();
    })
    .catch(e => {
      console.log(e);
      clear();
    });
  };

  const handleTextChange = (event) => {
    setInputValue(event.target.value);
  };

  const isValid = () => {
    if (!window?.plugins?.socialsharing) {
      alert('This share feature is not supported on this platform');
      return false;
    }
    if (!imageSrc) {
      alert('Please generate a picture first');
      return false;
    }
    return true;
  }

  const shareFacebook = () => {
    if (isValid()) {
      window.plugins.socialsharing.shareViaFacebook(
        'Sharing via Facebook', 
        imageSrc, 
        null
      );
    }
  };

  const shareInstgarm = () => {
    if (isValid()) {
      window.plugins.socialsharing.shareViaInstagram(
        'Message via Instagram', 
        imageSrc
      );
    }
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
            onClick={shareFacebook}
          />
          <Button
            iconIos='f7:logo_instagram'
            iconMd='material:instagram'
            onClick={shareInstgarm}
          />
        </div>
      </Block>
      
    </Page>
  );

}

export default HomePage;