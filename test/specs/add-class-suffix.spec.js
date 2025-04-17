import process from "../utils/process.js";
import compare from "../utils/compare.js";

describe("options.addClassSuffix", () => {
  it("should add suffix to classnames", async () => {
    let results = await process(
      `
      <html>
        <body>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `,
      {
        addClassSuffix: true,
        cssClasses: {
          toc: "outline",
          list: "outline-section",
          listItem: "outline-bullet",
          link: "page-link",
        },
      },
    );

    compare(
      results,
      `
      <html>
        <head></head>
        <body>
          <nav class="outline">
            <ol class="outline-section outline-section-1">
              <li class="outline-bullet outline-bullet-h1">
                <a class="page-link page-link-h1" href="#">One</a>

                <ol class="outline-section outline-section-2">
                  <li class="outline-bullet outline-bullet-h2">
                    <a class="page-link page-link-h2" href="#">Two</a>

                    <ol class="outline-section outline-section-3">
                      <li class="outline-bullet outline-bullet-h3">
                        <a class="page-link page-link-h3" href="#">Three</a>

                        <ol class="outline-section outline-section-4">
                          <li class="outline-bullet outline-bullet-h4">
                            <a class="page-link page-link-h4" href="#">Four</a>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `,
    );
  });

  it("shouldn't add suffixes to classnames", async () => {
    let results = await process(
      `
      <html>
        <body>
          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `,
      {
        addClassSuffix: false,
        cssClasses: {
          toc: "outline",
          list: "outline-section",
          listItem: "outline-bullet",
          link: "page-link",
        },
      },
    );

    compare(
      results,
      `
      <html>
        <head></head>
        <body>
          <nav class="outline">
            <ol class="outline-section">
              <li class="outline-bullet">
                <a class="page-link" href="#">One</a>

                <ol class="outline-section">
                  <li class="outline-bullet">
                    <a class="page-link" href="#">Two</a>

                    <ol class="outline-section">
                      <li class="outline-bullet">
                        <a class="page-link" href="#">Three</a>

                        <ol class="outline-section">
                          <li class="outline-bullet">
                            <a class="page-link" href="#">Four</a>
                          </li>
                        </ol>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>

          <h1>One</h1>
          <h2>Two</h2>
          <h3>Three</h3>
          <h4>Four</h4>
        </body>
      </html>
    `,
    );
  });
});
