import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import { usePropsWithComponentTheme } from 'native-base';

export default class Printer {

    constructor() {
      BluetoothManager.connect('66:22:EC:FF:0D:CA');
    }

    printItems = (orderNr, orderItems) => {
      BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
      BluetoothEscposPrinter.printText("*******", {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1,
      });
      BluetoothEscposPrinter.printAndFeed(3)
      BluetoothEscposPrinter.printText(orderNr, {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 3,
        heigthtimes: 3,
        fonttype: 1,
      });
      BluetoothEscposPrinter.printAndFeed(3)
      BluetoothEscposPrinter.printText("*******", {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 1,
      });

      BluetoothEscposPrinter.printAndFeed(10);
      BluetoothEscposPrinter.printText("-----------------------------", {});
      BluetoothEscposPrinter.printAndFeed(3)
      let columnWidths = [26, 6];
      BluetoothEscposPrinter.printColumn(columnWidths,
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        ["Artikel",'Mange'],{});
      BluetoothEscposPrinter.printText("-----------------------------", {});
      BluetoothEscposPrinter.printAndFeed(3)
      columnWidths = [24, 6];
      orderItems.forEach((item) => {
        BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
        //let iName = String(item.product.substring(0, 22));
        BluetoothEscposPrinter.printColumn(columnWidths,
          [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
          [item.product, `X${String(item.qty)}`],{});

          item.addition.forEach((add) => {
            let a = ""
            if (add.addTo) {
              a = `+${add.addition} `;
            } else {
              a = `-${add.addition} `;
            }
       
            BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
            BluetoothEscposPrinter.printText(a, {
              encoding: 'GBK',
              codepage: 0,
              widthtimes: 0,
              heigthtimes: 0,
              fonttype: 1,
            });
          });
          BluetoothEscposPrinter.printAndFeed(3);
      });
      BluetoothEscposPrinter.printText("-----------------------------", {});
      BluetoothEscposPrinter.printAndFeed(5);
    }
}