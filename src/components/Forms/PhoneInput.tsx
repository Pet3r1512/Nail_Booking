  return (
    <div className="w-full space-y-3">
      <label htmlFor="phone">Số điện thoại</label>
      <Input
        className={cn(
          " inputs ring-0 border-[1.25px] border-[#ededed] focus-visible:ring-offset-0 focus-visible:ring-0",
          error === "" && "border-green-400",
        )}
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="090*******"
      />
      {error !== "" && <p className="text-red-500">{error}</p>}
    </div>
  );
}
