import { useQuery } from "@tanstack/react-query";
import { getStays } from "../api/stay.api";
import { getQueryClient } from ".";

export const useStays = (country = "all", city = "all") => {
  return useQuery({
    // queryKey: ["stays", "all", "all"],
    queryKey: ["stays", country, city],
    queryFn: (info) => {
      // console.log(info);
      let data = [];
      if ([country, city].every((i) => i == "all")) {
        return getStays().action.then((res) => {
          return res.data;
        });
      } else {
        let _revisa = getQueryClient().getQueryData(["stays", country, city]);
        // console.log('revisa', _revisa);
        if (_revisa.length == 0) {
          const _all = getQueryClient().getQueryData(["stays", "all", "all"]);

          if (country == "all" && city != "all") {
            data = _all.filter((item) => item.city == city);
          } else if (country != "all" && city == "all") {
            data = _all.filter((item) => item.country == country);
          } else {
            data = _all.filter(
              (item) => item.country == country && item.city == city
            );
          }
          // getQueryClient().setQueryData(["stays", country, city], data);
        } else {
          data = _revisa;
        }
        return new Promise((resolve) => {
          resolve(data);
        });
      }
    },
    initialData: [],
  });
};
