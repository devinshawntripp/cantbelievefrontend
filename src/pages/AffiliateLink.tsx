import { useState, MouseEvent } from "react";

// import { Button, Form } from "react-bootstrap";

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
      console.log(firstSplit[firstSplit.length - 1]);

      linkSplit = "http" + firstSplit[firstSplit.length - 1];
    }

    linkSplit = linkSplit.split("?").at(0);

    setAffLink(linkSplit + tag);

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
    <main className="container mt-200">
      <section className="section">
        <div className="font-md">
          Paste the amazon link then press enter to get an aff link:
        </div>{" "}
        {/* <Form className="w-100 d-flex">
          <Form.Group className="" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="link"
              placeholder="ex: www.amazon.com/dp/BGHDLSKEH"
              aria-label="link"
              onChange={handleChange}
            />
          </Form.Group> */}
        <div className="sendButton">
          <a
            onClick={(e: any) => handleSubmit(e)}
            className="btn btn-brand-1 mt-10"
          >
            Get Link
          </a>
        </div>
        {/* </Form> */}
        {affLink && (
          <a
            className="font-md"
            target="_blank"
            rel="noopener noreferrer"
            href={String(affLink)}
          >
            {affLink}
          </a>
        )}
      </section>
    </main>
  );
}
