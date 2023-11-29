import React from 'react';
import { Page, Navbar, List, ListItem, BlockTitle, useStore } from 'framework7-react';

const CatalogPage = () => {
  const images = useStore('images');

  return (
    <Page name="history">
      <Navbar title="History" />
      <List dividersIos mediaList outlineIos strongIos>
        {images?.length && images.map((image) => (
          <ListItem key={image.id} title={image.title} subtitle={image.date}>
            <img
              slot="media"
              style={{ borderRadius: '8px' }}
              src={image.src}
              width="80"
            />
          </ListItem>
        ))}
        {!images?.length && <BlockTitle>No History Yet!</BlockTitle>}
      </List>
    </Page>
  );
};

export default CatalogPage;
