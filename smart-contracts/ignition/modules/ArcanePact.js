import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ArcanePact", (m) => {
  const arcanePact = m.contract("ArcanePact");

  return { arcanePact };
});
