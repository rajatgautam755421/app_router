import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardCommom({
  title = "",
  description = "",
  onClick,
  buttonText,
  image,
  onDelete,
  id,
  isLoading,
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

          {onDelete && (
            <Button
              className="mx-auto"
              variant="danger"
              disabled={isLoading}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardCommom;
