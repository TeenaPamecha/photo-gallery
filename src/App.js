import React from 'react';
import photo from './photo.json';
import './App.css';
import { Button, Modal, Stack, Navbar, Container, Breadcrumb, Image, Carousel } from 'react-bootstrap';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { imageList: photo, selectedType: 'All', selectedImageId: 1, show: false };
  }
  handleClose = () => { this.setState({ show: false }); }

  openInModel = (ev) => {
    ev.preventDefault();
    this.setState({ selectImageId: ev.target.id, show: true });
  };


  handelButtonClick = (ev) => {
    ev.preventDefault();
    const responseJson = ev.target.innerText == 'All' ? photo : photo.filter((img) => img.type == ev.target.innerText);
    this.setState({ imageList: responseJson, selectedType: ev.target.innerText });
  }
  onImageSelection = (ev) => {
    ev.preventDefault();
    this.setState({ selectImageId: ev.target.id })
  }
  render() {
    return (
      <>
        <Container>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#">Gallery</Navbar.Brand>
            </Container>
          </Navbar>
          <Breadcrumb>
            <Breadcrumb.Item href="#">PAGES</Breadcrumb.Item> &rarr;
            <Breadcrumb.Item href="#">GALLERY</Breadcrumb.Item>
          </Breadcrumb>
          <h2 className='text-center'>Photo Gallery</h2>
          <p className='text-center'>This is Photo Gallery Images where you can select the image to see bigger picture of that image.</p>
          <Stack direction="horizontal" gap={2} className="mb-3 text-center items-center">
            <Button as="type" value="All" variant={this.state.selectedType == 'All' ? 'success' : 'secondary'} onClick={this.handelButtonClick}>
              All
            </Button>
            <Button as="type" value="Branding" variant={this.state.selectedType == 'Branding' ? 'success' : 'secondary'} onClick={this.handelButtonClick}>
              Branding
            </Button>
            <Button as="type" value="Design" variant={this.state.selectedType == 'Design' ? 'success' : 'secondary'} onClick={this.handelButtonClick}>
              Design
            </Button>
            <Button as="type" value="Development" variant={this.state.selectedType == 'Development' ? 'success' : 'secondary'} onClick={this.handelButtonClick}>
              Development
            </Button>
          </Stack>
          <div className='image-grid'>
            {this.state.imageList.map((image) => (
              <Image src={image.url} key={image.id} id={image.id} alt={image.alt} onClick={this.openInModel} />
            ))}
          </div>
          <Modal class='modal show' aria-labelledby="contained-modal-title-vcenter" show={this.state.show} centered="true" backdrop="static" onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Image Show</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {this.state.imageList.map((image) => image.id == this.state.selectImageId ? (
                <Image src={image.url} alt={image.alt} className='selectedImage mb-2' />
              ) : '')}

              <Stack direction="horizontal" class="image-grid-ln" gap={2}>
                {this.state.imageList.map((image) => (
                  <Image src={image.url} key={image.id} id={image.id} width="60px" height="60px" className={this.state.selectImageId == image.id ? 'img-border' : 'img-nonBorder'} alt={image.alt} onClick={this.onImageSelection} />
                ))}
              </Stack>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </>
    );
  }
};

export default App;