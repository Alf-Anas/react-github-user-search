import DisplaySize from "../types.ts/DisplaySize.enum";

const determineDisplaySize = (width: number) => {
    if (width >= DisplaySize.Tablet) {
        if (width >= DisplaySize.ComputerM) {
            if (width >= DisplaySize.ComputerL) {
                return DisplaySize.ComputerL;
            } else {
                return DisplaySize.ComputerM;
            }
        } else if (width >= DisplaySize.ComputerS) {
            return DisplaySize.ComputerS;
        } else {
            return DisplaySize.Tablet;
        }
    } else if (width >= DisplaySize.MobileM) {
        if (width >= DisplaySize.MobileL) {
            return DisplaySize.MobileL;
        } else {
            return DisplaySize.MobileM;
        }
    } else if (width >= DisplaySize.MobileS) {
        return DisplaySize.MobileS;
    } else {
        return DisplaySize.NotSupported;
    }
};

export default determineDisplaySize;
