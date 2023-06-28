import { useEffect, useState } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      // console.log(newArticle);
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mt-6 w-full max-w-4xl">
      {/* Search */}
      <div className="flex flex-col m-auto w-full gap-2 max-w-xl">
        <form
          className="relative flex justify-center items-center"
          action=""
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => {
              setArticle({ ...article, url: e.target.value });
            }}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            {" "}
            &#9889;{" "}
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  className="w-[40%] h-[40%] object-contain"
                  alt="icon"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} className="w-20 h-20 object-contain" alt="loader" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that was not supposed to happen... <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700 tracking-wider leading-loose">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
