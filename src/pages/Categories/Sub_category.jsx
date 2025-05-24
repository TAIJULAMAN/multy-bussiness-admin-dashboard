import { useGet_all_sub_categoriesQuery } from '../../redux/api/categoryApis';

const Sub_category = ({ id }) => {
  const { data } = useGet_all_sub_categoriesQuery({ id });
  return (
    <div className="flex flex-wrap gap-2">
      {data?.data.map((sub) => (
        <span
          key={sub?._id}
          className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-green-50 text-green-700 border border-green-300"
        >
          {sub?.name}
        </span>
      ))}
    </div>
  )
}

export default Sub_category
