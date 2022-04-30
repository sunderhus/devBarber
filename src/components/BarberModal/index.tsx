import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ExpandIcon from '../../assets/expand.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import { BarberDetails } from '../../screens/Barber';
import { GlobalState } from '../../store';
import {
  BarberAvatar,
  BarberInfo,
  BarberName,
  CloseButton,
  DateInfo,
  DateItem,
  DateItemDay,
  DateItemNumber,
  DateList,
  DateNextArea,
  DatePrevArea,
  DateTitle,
  DateTitleArea,
  FinishButton,
  FinishButtonText,
  HourItem,
  HourItemText,
  HourList,
  Modal,
  ModalArea,
  ModalBody,
  ModalItem,
  ServiceInfo,
  ServiceName,
  ServicePrice
} from './styles';

interface BarberModalProps {
  show: boolean;
  setShow: (isOpen: boolean) => void;
  service: null | number;
}

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

interface ListDays {
  status: boolean;
  weekday: string;
  number: number;
  hours: Array<string>;
}

export default function BarberModal(props: BarberModalProps) {
  const navigation = useNavigation();
  const barberDetailsState = useSelector<GlobalState, BarberDetails>((state) => state.barbers.barberDetails)

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<null | number>(null);
  const [selectedHour, setSelectedHour] = useState('');
  const [listDays, setListDays] = useState<ListDays[]>([]);
  const [listHour, setListHour] = useState<string[]>([]);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const newListDays = [] as ListDays[];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      const year = date.getFullYear();
      let month = (date.getMonth() + 1) as number | string;
      let day = date.getDate() as number | string;
      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;
      const formatedDate = `${year}-${month}-${day}`;

      const availableDays = barberDetailsState.available.filter(
        availableDay => availableDay.date === formatedDate
      );

      newListDays.push({
        status: availableDays.length > 0,
        weekday: days[date.getDay()],
        number: i,
        hours:
          availableDays.length > 0 && availableDays[0].hours.length > 0
            ? availableDays[0].hours
            : []
      });
    }
    setListDays(newListDays);
    setSelectedDay(null);
    setListHour([]);
    setSelectedHour('');
  }, [barberDetailsState, selectedMonth, selectedYear]);
  useEffect(() => {
    const today = new Date();

    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  const handleCloseButton = () => {
    props.setShow(false);
  };

  const handleFinishButton = async () => {
    props.setShow(false);
    navigation.navigate('Appointments');
  };

  const handleLeftDateButton = () => {
    const mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1);
  };

  const handleRightDateButton = () => {
    const mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1);
  };

  const handleDaySelect = (itemNumber: number) => {
    setSelectedDay(itemNumber);
    let newHourList = null as null | Array<ListDays>;

    newHourList = listDays.filter(e => e.number === itemNumber);

    setListHour(newHourList[0].hours);
  };

  return (
    <Modal transparent visible={props.show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <ExpandIcon width="40" height="40" fill="#000" />
          </CloseButton>

          <ModalItem>
            <BarberInfo>
              <BarberAvatar source={{ uri: barberDetailsState.avatar }} />
              <BarberName>{barberDetailsState.name}</BarberName>
            </BarberInfo>
          </ModalItem>

          {props.service != null && (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>
                  {barberDetailsState.services[props.service].name}
                </ServiceName>
                <ServicePrice>
                  R${' '}
                  {barberDetailsState.services[props.service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            </ModalItem>
          )}

          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleLeftDateButton}>
                <NavPrevIcon width="35" height="35" fill="#000" />
              </DatePrevArea>
              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleArea>
              <DateNextArea onPress={handleRightDateButton}>
                <NavNextIcon width="35" height="35" fill="#000" />
              </DateNextArea>
            </DateInfo>
            <DateList horizontal showsHorizontalScrollIndicator={false}>
              {listDays.map((item, key) => (
                <DateItem
                  key={key}
                  disabled={!item.status}
                  onPress={() => handleDaySelect(item.number)}
                  style={{
                    opacity: item.status ? 1 : 0.5,
                    backgroundColor:
                      item.number === selectedDay ? '#4EADBE' : '#FFF'
                  }}
                >
                  <DateItemDay
                    style={{
                      color: item.number === selectedDay ? '#FFF' : '#000'
                    }}
                  >
                    {item.weekday}
                  </DateItemDay>
                  <DateItemNumber
                    style={{
                      color: item.number === selectedDay ? '#FFF' : '#000'
                    }}
                  >
                    {item.number}
                  </DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>
          {selectedDay && listHour.length > 0 && (
            <ModalItem>
              <HourList horizontal showsHorizontalScrollIndicator={false}>
                {listHour.map((item, key) => (
                  <HourItem
                    onPress={() => setSelectedHour(item)}
                    key={key}
                    style={{
                      backgroundColor:
                        item === selectedHour ? '#4EADBE' : '#FFF'
                    }}
                  >
                    <HourItemText
                      style={{
                        color: item === selectedHour ? '#FFF' : '#000'
                      }}
                    >
                      {item}
                    </HourItemText>
                  </HourItem>
                ))}
              </HourList>
            </ModalItem>
          )}

          <FinishButton onPress={handleFinishButton}>
            <FinishButtonText>Finalizar Agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </Modal>
  );
}
