import React from 'react';
import { Page, Navbar, List, ListItem, BlockTitle, useStore } from 'framework7-react';
import { shareInstgarm } from '../js/util';

const HistoryPage = () => {
  const images = useStore('images');

  return (
    <Page name='history'>
      <Navbar title='History' />
      <List dividersIos mediaList outlineIos strongIos>
        {images?.length && images.map((image) => (
          <ListItem 
            link='#'
            key={image.id}
            title={image.title}
            subtitle={image.date}
            onClick={() => shareInstgarm(image.src)}
            >
              <img
                slot='media'
                style={{ borderRadius: '8px' }}
                src={image.src}
                width='80'
              />
          </ListItem>
        ))}
        {!images?.length && (
          <div className='text-align-center'>
            <BlockTitle>No History Yet!</BlockTitle>
          </div>
        )}
      </List>
    </Page>
  );
};

export default HistoryPage;
