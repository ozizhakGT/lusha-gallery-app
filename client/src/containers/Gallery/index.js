import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import LoaderContainer from "../LoaderWrapper";
import useGallery from "../../hooks/useGallery";
import ImageWrapper from "../../components/ImageWrapper";
import Button from "../../components/Button";
import { renderFadeInAnimation } from "../../styles/animations";
import Notification from "../../const/notifications";
import lushaPhoto from "../../assets/images/lusha-photo.png";

const StyledGallery = styled.div`
  width: 1050px;
  margin: 5rem auto;
  text-align: center;
  
  .gallery-grid {
    opacity: 0;
    display: grid;
    grid-template-columns: repeat(3, 33%);
    grid-auto-rows: 40rem;
    grid-gap: 20px;
    ${renderFadeInAnimation}
  }
  
  ${Button} {
    margin-top: 4rem;
  }
  
  .no-content {
    p {
      font-size: 2rem;
    }
  }
  
  @media only screen and (max-width: 1100px) {
    width: 600px;
    
    .gallery-grid {
      grid-template-columns: repeat(2, 50%);
      grid-auto-rows: 30rem;
    }
  }

  @media only screen and (max-width: 700px) {
    width: 90%;

    .gallery-grid {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default function Gallery({ className }) {
  const { gallery, loading, fetchImages, page } = useGallery();
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = async () => {
    setShowMore(true);
    await fetchImages();

    setShowMore(false);
  };

  useEffect(() => {
    if (!gallery.length) return;

    const welcomeMessage = Notification("success");
    welcomeMessage("Welcome, Lusha says HI 🙃");
    welcomeMessage("Enjoy the gallery 🤘🏼", {delay: 1200});

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <LoaderContainer isLoading={loading}>
      <StyledGallery className={className}>
        {gallery.length ? (
          <>
            <div className="gallery-grid">
              {gallery.map(image => <ImageWrapper {...image} key={image.id} />)}
            </div>

            {page && <Button onClick={handleShowMore} disabled={showMore}>Show more</Button>}
          </>
        ) : (
          <div className="no-content">
            <img src={lushaPhoto} alt="lusha pic" />
            <p>No content to see here ..</p>
          </div>
        )}
      </StyledGallery>
    </LoaderContainer>
  )
};

Gallery.propTypes = {
  className: propTypes.string.isRequired
}

Gallery.defaultProps = {
  className: ''
}