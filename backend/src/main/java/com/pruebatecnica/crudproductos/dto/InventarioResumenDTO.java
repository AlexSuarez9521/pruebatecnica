package com.pruebatecnica.crudproductos.dto;

import com.pruebatecnica.crudproductos.model.Producto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventarioResumenDTO {

    private BigDecimal valorTotalInventario;
    private Producto productoMayorValor;
}
