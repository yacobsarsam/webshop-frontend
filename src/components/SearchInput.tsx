import { Input, InputGroup, Span } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useRef } from "react";
import useGameQueryStore from "@/store.ts";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          setSearchText(ref.current.value);
          navigate("/");
        }
      }}
    >
      <InputGroup
        startElement={
          <Span>
            <BsSearch />
          </Span>
        }
      >
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="Search produkt..."
          variant="outline"
        />
      </InputGroup>
    </form>
  );
};
export default SearchInput;
