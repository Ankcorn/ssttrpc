import { trpc } from "../trpc";
import { useQueryClient } from "react-query"

export function List() {
  const queryClient = useQueryClient()
  const articles = trpc.useQuery(['listArticles'])
  const mutation = trpc.useMutation('createArticle', {
    onSuccess: () => queryClient.invalidateQueries(['listArticles']),
  })
  return (
    <div style={{ padding: "1rem" }}>
      <h2>Articles</h2>
      <h3>Submit</h3>
      <form
        onSubmit={e => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          mutation.mutate({
            url: fd.get("url")!.toString(),
            title: fd.get("title")!.toString()
          });
          e.currentTarget.reset();
        }}
      >
        <input name="title" placeholder="title" />
        <input name="url" placeholder="url" />
        <button type="submit">Submit</button>
      </form>
      <h3>Latest</h3>
      <ol>
        {articles.data?.map(article => (
          <li>
            <div>
              <div>
                {article.title} - <a href={article.url}>{article.url}</a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
