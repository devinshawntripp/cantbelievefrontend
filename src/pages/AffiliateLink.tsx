import { useState, MouseEvent } from "react";

import { Button, Form } from "react-bootstrap";

export default function AffiliateLink(props: {}) {
  const [link, setLink] = useState<String>("");
  const [affLink, setAffLink] = useState<String>("");

  const tag = "/?tag=whybuy01d-20";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.ariaLabel === "link") {
      setLink(e.target.value);
    }
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    var linkSplit: any = "";
    if (!link.startsWith("http")) {
      const firstSplit = link.split("http");
      linkSplit = "http" + firstSplit.at(firstSplit.length - 1);
    }

    linkSplit = linkSplit.split("?").at(0);

    setAffLink(linkSplit.at(0) + tag);

    // const payload = { options: options };

    // axios
    //   .post(`${process.env.NEXT_PUBLIC_APP_URL}/api/sendMail`, payload)
    //   .then((res) => {
    //     notify(res.data);
    //   })
    //   .catch((error) => {
    //     notify(error);
    //   });
  };

  return (
    <div className="formInputs">
      <div>Paste the amazon link then press enter to get an aff link:</div>{" "}
      <Form className="w-50" style={{ marginLeft: "10%" }}>
        <Form.Group className="inputG" controlId="exampleForm.ControlInput1">
          <Form.Control
            type="link"
            placeholder="ex: www.amazon.com/dp/BGHDLSKEH"
            aria-label="link"
            onChange={handleChange}
          />
        </Form.Group>
        <div className="sendButton">
          <Button
            onClick={handleSubmit}
            className="LoginButton m-4"
            variant="primary"
          >
            Get Link
          </Button>
        </div>
      </Form>
      {affLink && (
        <a target="_blank" rel="noopener noreferrer" href={String(affLink)}>
          {affLink}
        </a>
      )}
    </div>
  );
}
