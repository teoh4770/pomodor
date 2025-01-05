interface DescriptionProps {
  id: string;
  description?: string;
}

const Description = ({ id, description }: DescriptionProps) =>
  description ? (
    <div aria-label="Todo description">
      <label className="hidden" htmlFor={"description-" + id}>
        description
      </label>
      <textarea
        id={"description-" + id}
        name="description"
        value={description}
        onChange={() => console.log("update description")}
        className="pointer-events-none w-full cursor-none resize-none rounded-lg bg-[#feff9c]/80 p-3 text-sm shadow-md"
      ></textarea>
    </div>
  ) : null;

export { Description };
