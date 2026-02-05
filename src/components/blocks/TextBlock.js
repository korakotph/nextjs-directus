export default function TextBlock({ content }) {
  return (
    <section>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </section>
  );
}