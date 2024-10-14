import { useMutation, useQuery } from "@tanstack/react-query";
import { getStays } from "../api/stay.api";
import { getQueryClient } from ".";

/**
 * Carga y filtrado de datos de estaciones
 * @param {string} country
 * @param {string} city
 * @returns
 */
export const useStays = (country = "all", city = "all", guests = -1) => {
  return useQuery({
    // queryKey: ["stays", "all", "all"],
    queryKey: ["stays", country, city, guests],
    queryFn: (info) => {

      let data = [];
      if ([country, city].every((i) => i == "all")) {
        return getStays().action.then((res) => {
          // getQueryClient().setQueryData(["firstCities", 'all'], res.data);
          return res.data;
        });
      } else {
        let _revisa = getQueryClient().getQueryData(["stays", country, city, guests]);
        if (_revisa.length == 0) {
          const _all = getQueryClient().getQueryData(["stays", "all", "all", -1]);

          if (country == "all" && city != "all") {
            data = _all.filter((item) => {
              return (
                item.city == city &&
                (guests > 0 ? item.maxGuests >= guests : true)
              );
            });
          } else if (country != "all" && city == "all") {
            data = _all.filter((item) => {
              return (
                item.country == country &&
                (guests > 0 ? item.maxGuests >= guests : true)
              );
            });
          } else {
            data = _all.filter(
              (item) =>
                item.country == country &&
                item.city == city &&
                (guests > 0 ? item.maxGuests >= guests : true)
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

export const useFirstCities = (country = "all") => {
  return useQuery({
    queryKey: ["firstCities", country],
    queryFn: (info) => {
      const res = getQueryClient().getQueryData(["firstCities", country]);
      return new Promise((resolve) => {
        resolve(res);
      });
    },
    initialData: [],
  });
};

export const useFilters = () => {
  return useQuery({
    queryKey: ["filters"],
    queryFn: () => {
      return new Promise((resolve) => {
        resolve(getQueryClient().getQueryData(["filters"]));
      });
    },
    initialData: ["all", "all", 0],
  });
};

export const useMutateFilters = () => {
  return useMutation({
    mutationFn: (data) => {
      const pre = getQueryClient().getQueryData(["filters"]);
      return new Promise((resolve) => {
        const _data = [data[0] || pre[0], data[1] || pre[1], data[2] || pre[2]];

        resolve(_data);
      });
    },
    onSuccess: (data) => {
      getQueryClient().setQueryData(["filters"], data);
    },
    onError: (err) => {
    },
  });
};

export const useMutationFirstCities = () => {
  return useMutation({
    mutationFn: (country = "all") => {
      let data = getQueryClient().getQueryData(["stays", country, "all", -1]);
      let res = [];
      res = data.reduce((acc, item) => {
        const { country, city } = item;
        const _country = acc.find((item) => item.country === country);
        if (_country) {
          if (!_country.cities.includes(city) && _country.cities.length < 4) {
            _country.cities.push(city);
          }
        } else {
          acc.push({
            country,
            cities: [city],
          });
        }
        return acc;
      }, []);
      return new Promise((resolve) => {
        getQueryClient().setQueryData(["firstCities", "all"], res);

        resolve(res);
      });
    },
  });
};
