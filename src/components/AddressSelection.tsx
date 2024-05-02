import { City, Country, State } from 'country-state-city'
import { useEffect, useState } from 'react'
import WindowedSelect from 'react-windowed-select'
import { Address } from '../models/Address'

const AddressSelection = ({
  address,
  setAddress,
}: {
  address: Address
  setAddress: (address: Address) => void
}) => {
  const [countries, setCountries] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [districts, setDistricts] = useState<any[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>()
  const [selectedCity, setSelectedCity] = useState<string | undefined>()
  const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>()

  useEffect(() => {
    const res = Country.getAllCountries()
    const options = [] as any[]
    res.map((country) => {
      options.push({ value: country.isoCode, label: country.name })
    })
    setCountries(options)
  }, [])

  useEffect(() => {
    const res = State.getStatesOfCountry(selectedCountry)
    const options = [] as any[]
    res.map((city) => {
      options.push({ value: city.isoCode, label: city.name })
    })
    setCities(options)
  }, [selectedCountry])

  useEffect(() => {
    if (selectedCountry && selectedCity) {
      const res = City.getCitiesOfState(selectedCountry, selectedCity)
      console.log(res)
      const options = [] as any[]
      res.map((city) => {
        options.push({ value: city.name, label: city.name })
      })
      setDistricts(options)
    }
  }, [selectedCity, selectedCountry])

  useEffect(() => {
    setAddress({
      country: selectedCountry,
      city: selectedCity,
      district: selectedDistrict,
    })
  }, [selectedCountry, selectedCity, selectedDistrict])

  return (
    <div className="w-full">
      <div className="flex gap-4">
        <WindowedSelect
          options={countries}
          windowThreshold={10}
          placeholder="Quốc gia"
          onChange={(e) => {
            setSelectedCountry(e?.value)
          }}
          className="flex-1"
        />

        <WindowedSelect
          options={cities}
          windowThreshold={10}
          placeholder="Tỉnh, thành phố"
          onChange={(e) => {
            setSelectedCity(e?.value)
          }}
          isDisabled={!selectedCountry}
        />
        <WindowedSelect
          options={districts}
          windowThreshold={10}
          placeholder="Quận, huyện"
          onChange={(e) => {
            setSelectedDistrict(e?.value)
          }}
          isDisabled={!selectedCountry || !selectedCity}
        />
      </div>
    </div>
  )
}
export default AddressSelection
