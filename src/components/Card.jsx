import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardCommom({
  title = "",
  description = "",
  onClick,
  buttonText,
  image,
}) {
  return (
    <Card style={{ width: "18rem" }} className="mx-auto">
      <Card.Img variant="top" src={image} style={{ height: "250px" }} />
      <Card.Body>
        <Card.Title>{title.slice(0, 20)}</Card.Title>
        <Card.Text>{description.slice(0, 30)}</Card.Text>

        <div className="d-flex jsutify-content-center w-100">
          <Button
            className="mx-auto"
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick();
            }}
          >
            {buttonText}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardCommom;
